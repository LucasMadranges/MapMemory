package mainType

import (
	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

func RegisterMainTypeRoutes(app *fiber.App, client *ent.Client) {
	app.Get("/mainTypes", GetMainTypes(client))
	app.Post("/mainTypes", CreateMainType(client))
	app.Put("/mainTypes/:mainTypeId", UpdateMainTypeByMainTypeId(client))
	app.Delete("/mainTypes/:mainTypeId", DeleteMainTypesById(client))
}
