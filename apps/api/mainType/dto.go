package mainType

type CreateMainTypeDto struct {
	Label string `json:"label" example:"Restaurant" validate:"required,max=25"`
	Color string `json:"color" example:"#000000" validate:"required"`
}

type UpdateMainTypeDto struct {
	Label string `json:"label" example:"Restaurant" validate:"required,max=25"`
	Color string `json:"color" example:"#000000" validate:"required"`
}
