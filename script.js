// Funções globais
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todos os componentes necessários
    initComponents();
    
    // Suaviza a transição de carregamento
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

function initComponents() {
    // Configura a navegação
    setupNavigation();
    
    // Configura os formulários
    setupForms();
    
    // Configura animações
    setupAnimations();
}

function setupNavigation() {
    // Ativa o item correspondente à página atual
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Adiciona efeito de clique nos botões de navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Adiciona efeito de loading antes de navegar
                const navIcon = this.querySelector('.nav-icon');
                const originalIcon = navIcon.textContent;
                navIcon.textContent = '⏳';
                
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 300);
            }
        });
    });
}

function setupForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula o processamento do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading-dots"></span> Processando';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Redireciona após "processamento"
                    if (form.classList.contains('login-form')) {
                        window.location.href = 'dashboard.html';
                    }
                }, 1500);
            }
        });
    });
}

function setupAnimations() {
    // Configura animações para elementos que aparecem na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Adiciona animação de loading com pontos
function addLoadingDots() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dot-flashing {
            0% { opacity: 0.2; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
            100% { opacity: 0.2; transform: translateY(0); }
        }
        
        .loading-dots::after {
            content: '...';
            display: inline-block;
            width: 20px;
            text-align: left;
        }
        
        .loading-dots span {
            display: inline-block;
            animation: dot-flashing 1.4s infinite linear;
        }
        
        .loading-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .loading-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
}

// Inicializa funções adicionais quando a página estiver totalmente carregada
window.addEventListener('load', function() {
    addLoadingDots();
    
    // Adiciona efeito de hover nos cards
    document.querySelectorAll('.goal-card, .transaction-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

// Função auxiliar para formatar datas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Função para simular gráficos
function simulateCharts() {
    const chartContainers = document.querySelectorAll('.chart-container');
    if (chartContainers.length > 0) {
        // Adiciona um placeholder estilizado para os gráficos
        chartContainers.forEach(container => {
            const chartTitle = container.querySelector('.chart-title')?.textContent || 'Gráfico';
            container.innerHTML = `
                <div class="chart-placeholder">
                    <div class="chart-simulation">
                        <div class="chart-bar" style="height: 70%; background-color: #6e62e5;"></div>
                        <div class="chart-bar" style="height: 50%; background-color: #a777e3;"></div>
                        <div class="chart-bar" style="height: 30%; background-color: #6e62e5;"></div>
                        <div class="chart-bar" style="height: 80%; background-color: #a777e3;"></div>
                        <div class="chart-bar" style="height: 60%; background-color: #6e62e5;"></div>
                    </div>
                    <div class="chart-title">${chartTitle}</div>
                </div>
            `;
        });
    }
}