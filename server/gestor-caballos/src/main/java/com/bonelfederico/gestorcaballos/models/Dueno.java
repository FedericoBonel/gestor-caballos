package com.bonelfederico.gestorcaballos.models;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "duenos")
public class Dueno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombres", length = 80)
    private String nombres;

    @NotNull
    @Column(name = "apellidos", length = 80)
    private String apellidos;

    @NotNull
    @Column(name = "telefono", length = 13)
    private String telefono;

    @NotNull
    @Column(name = "email", length = 80)
    private String email;

    @OneToOne(mappedBy = "dueno", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private Direccion direccion;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Dueno dueno = (Dueno) o;
        return id != null && Objects.equals(id, dueno.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
