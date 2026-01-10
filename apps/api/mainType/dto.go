package mainType

type CreateMainTypeDto struct {
	Name string `json:"name" example:"Restaurant" validate:"required,max=25"`
}
