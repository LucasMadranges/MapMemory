package request

type ErrorRequest struct {
	Success bool   `json:"success" example:"false"`
	Message string `json:"message" example:"Failed to retrieve users"`
}
