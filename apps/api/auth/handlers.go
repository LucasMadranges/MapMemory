package auth

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/ent/user"
	"github.com/gofiber/fiber/v2"
)

// FormLogin godoc
// @Summary User login
// @Description Authenticate user with email and password
// @Tags auth
// @Accept json
// @Produce json
// @Param credentials body LoginDTO true "Login credentials"
// @Success 200 {object} map[string]string "Returns JWT token"
// @Failure 400 {object} map[string]string "Invalid request body"
// @Failure 401 {object} map[string]string "Invalid credentials"
// @Router /auth/login [post]
func FormLogin(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var dto LoginDTO
		if err := c.BodyParser(&dto); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid body"})
		}

		user, err := client.User.
			Query().
			Where(user.EmailEQ(dto.Email)).
			Only(c.Context())

		if err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "invalid credentials"})
		}

		if err := CheckPassword(user.Password, dto.Password); err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "invalid credentials"})
		}

		token, _ := GenerateToken(user.ID)

		return c.JSON(fiber.Map{"token": token})
	}
}
