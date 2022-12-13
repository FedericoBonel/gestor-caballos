package com.bonelfederico.gestorcaballos.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "direcciones")
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "calle", length = 80)
    private String calle;

    @NotNull
    @Column(name = "numero")
    private Integer numero;

    @NotNull
    @ManyToOne
    private Ciudad ciudad;

    @NotNull
    @OneToOne
    private Dueno dueno;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Direccion direccion = (Direccion) o;
        return id != null && Objects.equals(id, direccion.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
