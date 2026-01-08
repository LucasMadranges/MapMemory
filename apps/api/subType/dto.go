package subType

type CreateSubTypeDto struct {
	Name string `json:"name" example:"Buffet à volonté" validate:"required,max=25"`
}
