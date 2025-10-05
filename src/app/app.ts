import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Role = 'ONG' | 'Favorita';

type ActivityPeriod = {
  label: string;
  start: string;
  end: string;
};

type Activity = {
  id: string;
  name: string;
  description: string;
  expectedResult: string;
  obtainedResult: string;
  category: string;
  kpi: {
    title: string;
    value: string;
    status: 'En progreso' | 'Completado' | 'En riesgo';
    description: string;
    trend: 'up' | 'down' | 'steady';
  };
  periods: ActivityPeriod[];
};

type SpecificObjective = {
  id: string;
  title: string;
  axes: string[];
  description: string;
  activities: Activity[];
};

type BudgetItem = {
  category: string;
  item: string;
  quantity: number;
  units: string;
  value: number;
};

type BudgetRequest = {
  document: string;
  status: 'Aprobado' | 'Rechazado' | 'En revisión';
  updatedAt: string;
  note: string;
};

type Project = {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  generalObjective: string;
  reach: string;
  amount: number;
  timeline: {
    months: number;
    start: string;
    end: string;
  };
  axes: string[];
  result: string;
  specificObjectives: SpecificObjective[];
  budget: BudgetItem[];
  budgetRequest: BudgetRequest;
};

type OrganizationProfile = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  token: string;
};

type FavoritaReview = {
  id: string;
  ong: string;
  project: string;
  amount: number;
  submittedAt: string;
  status: 'En revisión' | 'Observado' | 'Aprobado';
  nextStep: string;
  reviewer: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly loginModel = {
    email: 'impacto@alianzasolidaria.ec',
    password: 'alianza2025',
    role: 'ONG' as Role
  };

  protected readonly organizationProfile: OrganizationProfile = {
    name: 'Fundación Alianza Solidaria',
    contact: 'María Fernanda Torres',
    email: 'impacto@alianzasolidaria.ec',
    phone: '+593 99 456 7821',
    address: 'Av. Amazonas N34-125 y Naciones Unidas, Quito',
    summary:
      'ONG dedicada a fortalecer programas comunitarios en educación, salud preventiva y empleabilidad juvenil mediante alianzas con el sector privado.',
    token: 'ONG-FA-2025-9912'
  };

  protected readonly projects: Project[] = [
    {
      id: 'p-001',
      code: 'ONG-FA-001',
      name: 'Aulas Digitales para Comunidades Andinas',
      shortDescription:
        'Implementación de espacios tecnológicos itinerantes para mejorar la alfabetización digital de niñas, niños y adolescentes en la sierra centro.',
      generalObjective:
        'Garantizar el acceso a herramientas digitales que potencien habilidades educativas y de emprendimiento en comunidades rurales.',
      reach:
        '15 comunidades rurales en Cotopaxi y Tungurahua. Beneficio directo a 1.200 estudiantes y 150 docentes.',
      amount: 85000,
      timeline: {
        months: 12,
        start: '04/2025',
        end: '03/2026'
      },
      axes: ['Educación', 'Innovación', 'Inclusión'],
      result:
        '80% de los participantes incrementan sus competencias digitales y el 60% desarrolla proyectos escolares con tecnología.',
      specificObjectives: [
        {
          id: 'p-001-obj-1',
          title: 'Fortalecer competencias digitales docentes',
          axes: ['Educación', 'Capacitación'],
          description:
            'Formar a docentes en metodologías activas apoyadas en tecnología y contenidos locales relevantes.',
          activities: [
            {
              id: 'p-001-obj-1-act-1',
              name: 'Bootcamp pedagógico digital',
              description:
                'Jornadas intensivas de actualización en herramientas colaborativas, seguridad digital y diseño de proyectos STEAM.',
              expectedResult:
                '120 docentes certificados con plan de aula digital aplicado en sus instituciones.',
              obtainedResult:
                '72 docentes certificados en la primera cohorte (60%).',
              category: 'Capacitación',
              kpi: {
                title: 'Docentes certificados',
                value: '60% alcanzado',
                status: 'En progreso',
                description:
                  'Porcentaje de docentes que completaron la certificación respecto a la meta anual.',
                trend: 'up'
              },
              periods: [
                { label: 'Cohorte 1', start: '06/2025', end: '07/2025' },
                { label: 'Cohorte 2', start: '09/2025', end: '10/2025' }
              ]
            },
            {
              id: 'p-001-obj-1-act-2',
              name: 'Acompañamiento aula espejo',
              description:
                'Mentorías personalizadas dentro del aula durante la implementación de proyectos con estudiantes.',
              expectedResult:
                'Acompañar 150 horas de clase y documentar buenas prácticas replicables.',
              obtainedResult:
                '40 horas de mentoría ejecutadas, repositorio colaborativo publicado.',
              category: 'Mentoría',
              kpi: {
                title: 'Horas de mentoría completadas',
                value: '27% alcanzado',
                status: 'En riesgo',
                description:
                  'Progreso mensual de horas ejecutadas vs. plan anual. Requiere refuerzo de mentores locales.',
                trend: 'steady'
              },
              periods: [
                { label: 'Fase piloto', start: '08/2025', end: '08/2025' },
                { label: 'Fase expansión', start: '11/2025', end: '01/2026' }
              ]
            }
          ]
        },
        {
          id: 'p-001-obj-2',
          title: 'Incorporar aulas móviles en comunidades',
          axes: ['Infraestructura', 'Innovación'],
          description:
            'Trasladar laboratorios tecnológicos móviles equipados con conectividad satelital a comunidades aisladas.',
          activities: [
            {
              id: 'p-001-obj-2-act-1',
              name: 'Adecuación de aulas móviles',
              description:
                'Equipamiento de buses con paneles solares, routers satelitales y estaciones de aprendizaje modulares.',
              expectedResult:
                '3 aulas móviles en circulación con mantenimiento preventivo trimestral.',
              obtainedResult:
                '2 aulas móviles listas y en pruebas técnicas.',
              category: 'Infraestructura',
              kpi: {
                title: 'Unidades equipadas',
                value: '66% alcanzado',
                status: 'En progreso',
                description:
                  'Número de aulas móviles habilitadas respecto a la meta anual.',
                trend: 'up'
              },
              periods: [
                { label: 'Fabricación', start: '05/2025', end: '07/2025' },
                { label: 'Puesta en marcha', start: '08/2025', end: '09/2025' }
              ]
            }
          ]
        }
      ],
      budget: [
        { category: 'Tecnología', item: 'Computadoras portátiles', quantity: 45, units: 'unidad', value: 780 },
        { category: 'Tecnología', item: 'Tabletas robustas', quantity: 60, units: 'unidad', value: 320 },
        { category: 'Conectividad', item: 'Routers satelitales', quantity: 3, units: 'equipo', value: 2400 },
        { category: 'Materiales educativos', item: 'Kits de robótica', quantity: 15, units: 'kit', value: 520 }
      ],
      budgetRequest: {
        document: 'Solicitud-Presupuesto-Aulas-Digitales.pdf',
        status: 'En revisión',
        updatedAt: '12/02/2025',
        note: 'El comité financiero de La Favorita revisa alineación con ejes de innovación social.'
      }
    },
    {
      id: 'p-002',
      code: 'ONG-FA-014',
      name: 'Red de Huertos Saludables',
      shortDescription:
        'Producción agroecológica liderada por mujeres para abastecer comedores comunitarios en Pichincha y Santo Domingo.',
      generalObjective:
        'Promover seguridad alimentaria sostenible mediante emprendimientos agrícolas femeninos.',
      reach:
        '250 familias organizadas en 10 asociaciones rurales. 5 comedores comunitarios beneficiados.',
      amount: 64000,
      timeline: {
        months: 10,
        start: '02/2025',
        end: '11/2025'
      },
      axes: ['Producción sostenible', 'Salud', 'Género'],
      result:
        'Incremento del 35% en disponibilidad de hortalizas frescas y generación de ingresos recurrentes para 120 mujeres.',
      specificObjectives: [
        {
          id: 'p-002-obj-1',
          title: 'Fortalecer capacidades productivas',
          axes: ['Capacitación', 'Sostenibilidad'],
          description:
            'Mejorar prácticas agroecológicas y gestión asociativa de las mujeres productoras.',
          activities: [
            {
              id: 'p-002-obj-1-act-1',
              name: 'Escuela de agroecología aplicada',
              description:
                'Módulos prácticos sobre bioinsumos, riego eficiente y comercialización justa.',
              expectedResult:
                '90 mujeres certificadas y aplicando planes de cultivo sostenible.',
              obtainedResult:
                '45 mujeres certificadas en el primer ciclo formativo.',
              category: 'Capacitación',
              kpi: {
                title: 'Participantes certificadas',
                value: '50% alcanzado',
                status: 'En progreso',
                description:
                  'Progreso de participantes certificadas vs. meta anual. Segundo ciclo inicia en mayo.',
                trend: 'up'
              },
              periods: [
                { label: 'Ciclo 1', start: '02/2025', end: '04/2025' },
                { label: 'Ciclo 2', start: '05/2025', end: '07/2025' }
              ]
            },
            {
              id: 'p-002-obj-1-act-2',
              name: 'Mesa de asociatividad',
              description:
                'Sesiones mensuales para fortalecer gobernanza y acuerdos de comercialización.',
              expectedResult:
                '10 mesas instaladas con actas y planes de mejora documentados.',
              obtainedResult:
                '3 mesas instaladas y actas compartidas en drive colaborativo.',
              category: 'Gestión comunitaria',
              kpi: {
                title: 'Mesas instaladas',
                value: '30% alcanzado',
                status: 'En progreso',
                description:
                  'Número de mesas de asociatividad con actas validadas respecto a la meta.',
                trend: 'up'
              },
              periods: [
                { label: 'Convocatoria', start: '03/2025', end: '03/2025' },
                { label: 'Implementación', start: '04/2025', end: '11/2025' }
              ]
            }
          ]
        }
      ],
      budget: [
        { category: 'Infraestructura', item: 'Invernaderos modulares', quantity: 8, units: 'estructura', value: 2100 },
        { category: 'Herramientas', item: 'Kits de riego por goteo', quantity: 12, units: 'kit', value: 450 },
        { category: 'Operación', item: 'Transporte semanal', quantity: 40, units: 'viaje', value: 85 },
        { category: 'Comunicación', item: 'Material educativo impreso', quantity: 500, units: 'ejemplar', value: 6.5 }
      ],
      budgetRequest: {
        document: 'Presupuesto-Huertos-Saludables.xlsx',
        status: 'Aprobado',
        updatedAt: '28/01/2025',
        note: 'Aprobado con observación de presentar reporte de impacto trimestral.'
      }
    }
  ];

  protected readonly favoritaReviews: FavoritaReview[] = [
    {
      id: 'req-341',
      ong: 'Fundación Alianza Solidaria',
      project: 'Aulas Digitales para Comunidades Andinas',
      amount: 85000,
      submittedAt: '12/02/2025',
      status: 'En revisión',
      nextStep: 'Revisión financiera y visitas técnicas programadas para marzo.',
      reviewer: 'Equipo Innovación Social La Favorita'
    },
    {
      id: 'req-322',
      ong: 'Fundación Semillas del Futuro',
      project: 'Centros de bienestar juvenil',
      amount: 54000,
      submittedAt: '30/01/2025',
      status: 'Observado',
      nextStep: 'Esperando actualización de plan de indicadores y matriz de riesgos.',
      reviewer: 'Comité de Sostenibilidad La Favorita'
    },
    {
      id: 'req-301',
      ong: 'Fundación Alianza Solidaria',
      project: 'Red de Huertos Saludables',
      amount: 64000,
      submittedAt: '20/01/2025',
      status: 'Aprobado',
      nextStep: 'Seguimiento de desembolsos y reporte de impacto trimestral.',
      reviewer: 'Dirección de RSE La Favorita'
    }
  ];

  protected readonly isAuthenticated = signal(false);
  protected readonly selectedRole = signal<Role>('ONG');
  protected readonly authToken = signal<string | null>(null);
  protected readonly selectedProjectId = signal<string>(this.projects[0].id);
  protected readonly selectedObjectiveId = signal<string>(
    this.projects[0].specificObjectives[0].id
  );

  protected readonly selectedProject = computed(() =>
    this.projects.find((project) => project.id === this.selectedProjectId()) ?? null
  );

  protected readonly selectedObjective = computed(() => {
    const project = this.selectedProject();
    if (!project) {
      return null;
    }

    return (
      project.specificObjectives.find(
        (objective) => objective.id === this.selectedObjectiveId()
      ) ?? project.specificObjectives[0] ?? null
    );
  });

  protected login(): void {
    if (!this.loginModel.email || !this.loginModel.password) {
      return;
    }

    const generatedToken =
      this.loginModel.role === 'ONG' ? 'ONG-FA-TOKEN-2025-LAF' : 'FAVORITA-PORTAL-2025';

    this.isAuthenticated.set(true);
    this.selectedRole.set(this.loginModel.role);
    this.authToken.set(generatedToken);

    const defaultProject = this.projects[0];
    this.selectedProjectId.set(defaultProject.id);
    this.selectedObjectiveId.set(defaultProject.specificObjectives[0].id);
  }

  protected logout(): void {
    this.isAuthenticated.set(false);
    this.authToken.set(null);
    this.selectedRole.set('ONG');
    this.loginModel.password = '';
  }

  protected switchRole(role: Role): void {
    this.selectedRole.set(role);
    if (role === 'ONG') {
      const defaultProject = this.projects[0];
      this.selectedProjectId.set(defaultProject.id);
      this.selectedObjectiveId.set(defaultProject.specificObjectives[0].id);
    }
  }

  protected viewProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
    const project = this.projects.find((item) => item.id === projectId);
    if (project) {
      this.selectedObjectiveId.set(project.specificObjectives[0].id);
    }
  }

  protected viewObjective(objectiveId: string): void {
    this.selectedObjectiveId.set(objectiveId);
  }

  protected getBudgetTotal(project: Project): number {
    return project.budget.reduce((total, item) => total + item.quantity * item.value, 0);
  }

  protected statusToBadge(status: string): 'approved' | 'review' | 'rejected' | 'observed' {
    switch (status) {
      case 'Aprobado':
        return 'approved';
      case 'Rechazado':
        return 'rejected';
      case 'Observado':
        return 'observed';
      default:
        return 'review';
    }
  }

  protected get totalRequestedAmount(): number {
    return this.favoritaReviews.reduce((total, request) => total + request.amount, 0);
  }

  protected get approvedRequests(): number {
    return this.favoritaReviews.filter((request) => request.status === 'Aprobado').length;
  }

  protected get reviewRequests(): number {
    return this.favoritaReviews.filter((request) => request.status === 'En revisión').length;
  }

  protected get totalManagedAmount(): number {
    return this.projects.reduce((total, project) => total + project.amount, 0);
  }
}
