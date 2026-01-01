package user

import "github.com/LucasMadranges/MapMemory/ent/user"

type CreateUserDTO struct {
	Avatar    string     `json:"avatar" example:"https://example.com/" validate:"url"`
	Role      *user.Role `json:"role,omitempty" example:"user" validate:"omitempty,oneof=admin user"`
	Firstname string     `json:"firstname" example:"Lucas" validate:"required"`
	Lastname  string     `json:"lastname" example:"Madranges" validate:"required"`
	Email     string     `json:"email" example:"lucasmadranges@gmail.com" validate:"required,email"`
	Password  string     `json:"password" example:"Azertye789456&!" validate:"required,min=12,password_strength"`
}
