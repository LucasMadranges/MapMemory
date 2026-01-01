package auth

type LoginDTO struct {
	Email    string `json:"email" example:"lucasmadranges@gmail.com" validate:"required,email"`
	Password string `json:"password" example:"Azertye789456&!" validate:"required,min=12,password_strength"`
}
