package com.bonelfederico.gestorcaballos.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "espacios")
public class Espacio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "localizacion", length = 80)
    private String localizacion;

    @NotNull
    @Column(name = "nombre", length = 80)
    private String nombre;

    @NotNull
    @ManyToOne
    private Tipo tipo;

    @OneToOne(mappedBy = "espacio", cascade = CascadeType.ALL)
    private Caballo caballo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Espacio espacio = (Espacio) o;
        return id != null && Objects.equals(id, espacio.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
