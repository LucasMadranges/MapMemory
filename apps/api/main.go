package main

import (
	"log"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/user"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"

	"github.com/LucasMadranges/MapMemory/database"
	_ "github.com/LucasMadranges/MapMemory/docs"
)

// @title Go Fiber API
// @version 1.0
// @description API avec Fiber, Ent et Swagger
// @host localhost:4000
// @BasePath /
func main() {
	app := fiber.New()
	config.Load()

	client := database.NewClient()
	defer func(client *ent.Client) {
		err := client.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(client)

	app.Get("/swagger/*", swagger.HandlerDefault)

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	/* NOTE : Routes */
	user.RegisterUserRoutes(app, client)

	log.Fatal(app.Listen(":4000"))
}
