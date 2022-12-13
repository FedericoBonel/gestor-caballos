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
@Entity(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", length = 80)
    @NotNull
    private String username;

    @Column(name = "password", length = 80)
    @NotNull
    private String password;

    @Column(name = "enabled", length = 80)
    @NotNull
    private Boolean enabled = true;

    @Column(name = "email", length = 80)
    @NotNull
    private String email;

    @Column(name = "nombres", length = 80)
    @NotNull
    private String nombres;

    @Column(name = "apellidos", length = 80)
    @NotNull
    private String apellidos;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Usuario usuario = (Usuario) o;
        return id != null && Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
