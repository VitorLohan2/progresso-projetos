import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';
import logo from './assets/logo.svg';
import logoWhite from './assets/logo_white.png';

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Sistema de Visitantes - Liberaê (Beta)",
    description: "Sistema está em fase de teste e novas funcionalidades estão sendo desenvolvidas.",
    progress: 100
  },
  {
    id: 2,
    name: "Aplicativo Liberaê (Mobile)",
    description: "Está em desenvolvimento um aplicativo para Android com interface moderna e funcionalidades avançadas.",
    progress: 30
  },
  {
    id: 3,
    name: "DimeX",
    description: "Aguardando virada do C-Plus para obter acesso de dados Atualizados.",
    progress: 90
  },
  {
    id: 4,
    name: "Sistema de Carregamento 2.0",
    description: "Versão 2.0 do Sistema de Carregamento com interface moderna e funcionalidades avançadas incluindo Dashboard e Gráficos em tempo real.",
    progress: 30
  }
];

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const getProgressColor = (progress: number) => {
    if (isDarkTheme) {
      if (progress >= 100) return '#50fa7b'; // Dracula green
      if (progress >= 50) return '#f1fa8c'; // Dracula yellow  
      return '#ffb86c'; // Dracula orange
    } else {
      if (progress >= 100) return '#059669'; // Green-600
      if (progress >= 50) return '#16a34a'; // Green-600
      return '#65a30d'; // Lime-600
    }
  };

  const getStatusText = (progress: number) => {
    if (progress >= 100) return 'Concluído';
    if (progress >= 50) return 'Em Andamento';
    return 'Iniciado';
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          {/* Logo e Nome da Empresa */}
          <div className="logo-section">
            <div className="logotipo">
            <img src={isDarkTheme ? logoWhite : logo} alt="DIME" />
            </div>
          </div>

          {/* Toggle de Tema */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Alternar tema"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        {/* Título da Página */}
        <div className="page-title">
          <h2>Projetos em Desenvolvimento</h2>
          <p>Acompanhe o progresso dos nossos projetos em tempo real</p>
        </div>

        {/* Lista de Projetos */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Cabeçalho do Projeto */}
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Barra de Progresso */}
              <div className="progress-section">
                <div className="progress-header">
                  <span className="progress-label">Progresso</span>
                  <span className="progress-percentage">{project.progress}%</span>
                </div>
                
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: getProgressColor(project.progress),
                    }}
                  >
                    <div className="progress-shine" />
                  </div>
                </div>
              </div>

              {/* Status do Projeto */}
              <div className="project-footer">
                <span 
                  className={`status-badge ${
                    project.progress >= 100 ? 'status-completed' : 
                    project.progress >= 50 ? 'status-progress' : 'status-started'
                  }`}
                >
                  {getStatusText(project.progress)}
                </span>
                
                <span className="last-updated">
                  Atualizado recentemente
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Resumidas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{projects.length}</div>
            <div className="stat-label">Total de Projetos</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">
              {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
            </div>
            <div className="stat-label">Progresso Médio</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">
              {projects.filter(p => p.progress >= 80).length}
            </div>
            <div className="stat-label">Quase Concluídos</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 DIME - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;