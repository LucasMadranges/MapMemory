package auth

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/ent/user"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/LucasMadranges/MapMemory/utils/validation"
	"github.com/gofiber/fiber/v2"
)

// Login godoc
// @Summary User login
// @Description Authenticate user with email and password
// @Tags auth
// @Accept json
// @Produce json
// @Param credentials body LoginDTO true "Login credentials"
// @Success 200 {object} request.SuccessGetOneRequest "Retourne un JWT token"
// @Failure 400 {object} request.ErrorRequest "Corps de requête invalide"
// @Failure 400 {object} request.ErrorRequest "Données invalides"
// @Failure 401 {object} request.ErrorRequest "Données de connexion invalides"
// @Failure 404 {object} request.ErrorRequest "Utilisateur non trouvé"
// @Router /auth/login [post]
func Login(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body LoginDTO

		if err := validation.ValidatePassword(config.Validate); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
			})
		}

		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
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
			return c.Status(404).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Utilisateur non trouvé",
				Explicit: err.Error(),
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
