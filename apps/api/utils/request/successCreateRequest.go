package request

type SuccessCreateRequest struct {
	Success bool `json:"success" example:"true"`
	Data    any  `json:"data"`
}
