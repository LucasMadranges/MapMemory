package schema

import (
	"regexp"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type SubType struct {
	ent.Schema
}

func (SubType) Fields() []ent.Field {
	return []ent.Field{
		field.String("label").NotEmpty().MaxLen(25),
		field.String("color").NotEmpty().MaxLen(7).Match(regexp.MustCompile("^#[0-9A-Fa-f]{6}$")),
	}
}

func (SubType) Edges() []ent.Edge {
	return []ent.Edge{
		// 1 subtype appartient à 0 ou plusieurs maintypes
		edge.From("main_types", MainType.Type).
			Ref("sub_types").
			Required().
			Unique(),
		// 1 subtype appartient à 0 ou plusieurs memories
		edge.From("memories", Memory.Type).
			Ref("sub_type"),
	}
}
