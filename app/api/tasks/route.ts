import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tasks = await prisma.task.findMany({
    where: { assignedToId: session.user.id },
    include: { project: true }
  })

  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, description, projectId, dueDate } = await request.json()

  if (!title || !projectId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // Check if user is member of project or admin
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true, owner: true }
  })

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  const isMember = project.members.some((m: { id: string }) => m.id === session.user.id) || project.ownerId === session.user.id
  const isAdmin = session.user.role === "ADMIN"

  if (!isMember && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      dueDate: dueDate ? new Date(dueDate) : null,
      assignedToId: session.user.id // assign to self for now
    }
  })

  return NextResponse.json(task)
}
