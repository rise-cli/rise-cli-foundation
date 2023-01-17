export type Flag = {
    flag: string
    default: string
    description?: string
}

export type CommandConfig = {
    command: string
    action: (flags: Flag[]) => Promise<void>
    flags: Flag[]
    description?: string
}
