package config

import (
	config "github.com/LucasMadranges/MapMemory/internal/config/jwt"
	"github.com/go-playground/validator/v10"
)

var JWTSecret []byte
var Validate *validator.Validate

func Load() {
	JWTSecret = []byte(config.LoadJWT())
	Validate = validator.New()
}
