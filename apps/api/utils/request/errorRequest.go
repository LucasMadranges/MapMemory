package request

type ErrorRequest struct {
	Success  bool   `json:"success" example:"false"`
	Message  string `json:"message"`
	Explicit string `json:"explicit"`
}
