import zod from 'zod'

export const userSignUpSchema = zod.object({
    name:zod.string().min(3),
    email:zod.email(),
    password:zod.string().min(6)
})
export type userSignUpSchemaType = zod.infer<typeof userSignUpSchema>