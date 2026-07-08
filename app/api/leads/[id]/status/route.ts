import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasDatabaseConfig } from "@/lib/utils";
import { statusUpdateSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const parsed = statusUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid status", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (!hasDatabaseConfig()) {
    return NextResponse.json({
      lead: { id, status: parsed.data.status },
      mode: "sample",
      warning:
        "DATABASE_URL and DIRECT_URL are not configured, so the status update was simulated.",
    });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: parsed.data.status,
      automationLogs: {
        create: {
          eventType: "lead_status_updated",
          payload: { status: parsed.data.status },
        },
      },
    },
    include: { automationLogs: { orderBy: { createdAt: "desc" } } },
  });

  return NextResponse.json({ lead, mode: "database" });
}
