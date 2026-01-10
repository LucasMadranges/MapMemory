package schema

import (
	"regexp"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type MainType struct {
	ent.Schema
}

func (MainType) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty().MaxLen(25),
		field.String("color").NotEmpty().MaxLen(7).Match(regexp.MustCompile("^#[0-9A-Fa-f]{6}$")),
	}
}

func (MainType) Edges() []ent.Edge {
	return []ent.Edge{
		// 1 maintype appartient à 0 ou plusieurs memories
		edge.From("memories", Memory.Type).
			Ref("main_type"),
		// 1 maintype possède plusieurs subtypes (many-to-many)
		edge.To("sub_types", SubType.Type).
			StorageKey(edge.Column("main_type_id")),
	}
}
