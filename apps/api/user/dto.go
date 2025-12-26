package user

type CreateUserDTO struct {
	Avatar    string `json:"avatar" example:"https://example.com/" validate:"url"`
	Firstname string `json:"firstname" example:"Lucas" validate:"required,min=2"`
	Lastname  string `json:"lastname" example:"Madranges" validate:"required,min=2"`
	Email     string `json:"email" example:"lucasmadranges@gmail.com" validate:"required,email"`
	Password  string `json:"password" example:"Azertye789456&!" validate:"required,min=12,password_strength"`
}
