package com.bonelfederico.gestorcaballos.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Set;

@Entity(name = "tipos")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Tipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "descripcion", length = 80)
    private String descripcion;

    @OneToMany(mappedBy = "tipo", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Espacio> espacios;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Tipo tipo = (Tipo) o;
        return id != null && Objects.equals(id, tipo.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
