package com.bonelfederico.gestorcaballos.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity(name = "caballos")
public class Caballo {

    // Numero de cuidados maximos que se pueden asignar a un caballo
    public static final int MAX_NUMBER_CUIDADOS = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", length = 80)
    private String nombre;

    @NotNull
    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @NotNull
    @Column(name = "color_pelo", length = 80)
    private String colorPelo;

    @NotNull
    @Column(name = "altura_metros")
    private Float alturaMetros;

    @NotNull
    @Column(name = "sexo", length = 80)
    private String sexo;

    @NotNull
    @Column(name = "identificacion", length = 80)
    private String identificacion;

    @NotNull
    @ManyToOne
    private Dueno dueno;

    @OneToMany(mappedBy = "caballo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<CuidadoExtra> cuidadosExtra = new HashSet<>();

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    private Espacio espacio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Caballo caballo = (Caballo) o;
        return id != null && Objects.equals(id, caballo.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
