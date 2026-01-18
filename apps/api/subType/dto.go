package subType

type CreateSubTypeDto struct {
	Label      string `json:"label" example:"Buffet à volonté" validate:"required,max=25"`
	Color      string `json:"color" example:"#000000" validate:"required"`
	MainTypeID int    `json:"main_type_id" example:"1" validate:"required"`
}

type UpdateSubTypeDto struct {
	Label string `json:"label" example:"Buffet à volonté" validate:"required,max=25"`
	Color string `json:"color" example:"#000000" validate:"required"`
}
