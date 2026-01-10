package subType

type CreateSubTypeDto struct {
	Name       string `json:"name" example:"Buffet à volonté" validate:"required,max=25"`
	Color      string `json:"color" example:"#000000" validate:"required"`
	MainTypeID int    `json:"main_type_id" example:"1" validate:"required"`
}
