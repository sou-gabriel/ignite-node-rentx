export interface IUserResponseDTO {
  email: string
  name: string
  id: string | undefined
  avatar: string
  driver_license: string
  avatar_url(): string
}
