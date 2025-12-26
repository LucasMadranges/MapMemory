package request

type SuccessGetOneRequest struct {
	Success bool `json:"success" example:"true"`
	Data    any  `json:"data"`
}
