package auth

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/ent/user"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/gofiber/fiber/v2"
)

// Login godoc
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
func Login(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body LoginDTO
		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success: false,
				Message: "Corps de requête invalide",
			})
		}

		if err := config.Validate.Struct(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success: false,
				Message: "Données invalides",
			})
		}

		user, err := client.User.
			Query().
			Where(user.EmailEQ(body.Email)).
			Only(c.Context())

		if err != nil {
			return c.Status(401).JSON(request.ErrorRequest{
				Success: false,
				Message: "Données de connexion invalides",
			})
		}

		if err := CheckPassword(user.Password, body.Password); err != nil {
			return c.Status(401).JSON(request.ErrorRequest{
				Success: false,
				Message: "Données de connexion invalides",
			})
		}

		token, _ := GenerateToken(user)

		return c.JSON(request.SuccessGetOneRequest{
			Success: true,
			Data:    token,
		})
	}
}
