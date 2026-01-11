package mainType

type CreateMainTypeDto struct {
	Name  string `json:"name" example:"Restaurant" validate:"required,max=25"`
	Color string `json:"color" example:"#000000" validate:"required"`
}

type UpdateMainTypeDto struct {
	Name  string `json:"name" example:"Restaurant" validate:"required,max=25"`
	Color string `json:"color" example:"#000000" validate:"required"`
}
