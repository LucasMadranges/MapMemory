package auth

import (
	"github.com/LucasMadranges/MapMemory/utils/bcrypt"
)

func CheckPassword(hash, password string) error {
	return bcrypt.CheckPassword(hash, password)
}
