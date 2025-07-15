// Espera o documento carregar
$(document).ready(function() {

    // ===== FUNCIONALIDADE 1: NAVEGAÇÃO COM ROLAGEM SUAVE =====
    $("#links a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // ===== FUNCIONALIDADE 2: EFEITO DE ZOOM NO FUNDO =====
    var width = $(window).width();
    window.onscroll = function() {
        if ((width >= 900)) {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                $("#middle").css("background-size", "150% auto");
            } else {
                $("#middle").css("background-size", "100% auto");
            }
        }
    };

    // ===== FUNCIONALIDADE 3: PRELOADER =====
    setTimeout(function() {
        $("#loading").addClass("animated fadeOut");
        setTimeout(function() {
            $("#loading").css("display", "none");
        }, 800);
    }, 1450);

    // ===== FUNCIONALIDADE 4: ANIMAÇÕES DE ENTRADA =====
    $("#header").addClass("animated slideInDown").css("animation-delay", "1.8s");
    $("#tagline").addClass("animated zoomIn").css("animation-delay", "1.8s");

    // ===== LEITURA DO BLOG (SEU CÓDIGO ORIGINAL) =====
     $.getJSON("blog.json", function(blog) {
        blog = blog || [];
        if (blog.length == 0) {
            return (document.getElementById("blog_section").style.display =
                "none");
        }
        for (var i = 0; i < blog.length; i++) {
            $("#blogs").append(`
                <a href="./blog/${blog[i].url_title}/" target="_blank">
                    <section>
                        <img src="./blog/${blog[i].url_title}/${blog[i].top_image}">
                        <div class="blog_container">
                            <div class="section_title">${blog[i].title}</div>
                            <div class="about_section">
                                ${blog[i].sub_title}
                            </div>
                        </div>
                    </section>
                </a>
            `);
        }
    }).fail(function() {
        return (document.getElementById("blog_section").style.display = "none");
    });

    /* DENTRO DE $(document).ready(function() { ... }); */

// ===== CARREGAMENTO DINÂMICO DE PROJETOS DO GITHUB =====
const username = 'AgathaKarenne32';
const reposContainer = document.getElementById('work_section');
const GITHUB_API_URL = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;

fetch(GITHUB_API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro de rede ao buscar repositórios');
        }
        return response.json();
    })
    .then(repos => {
        reposContainer.innerHTML = ''; // Limpa a seção para garantir

        // Filtra para não mostrar o repositório do seu próprio perfil
        const filteredRepos = repos.filter(repo => repo.name.toLowerCase() !== username.toLowerCase());

        filteredRepos.forEach(repo => {
            const description = repo.description || 'Clique para ver os detalhes no GitHub.';
            const language = repo.language || '';

            const projectHTML = `
                <a href="${repo.html_url}" target="_blank">
                    <section>
                        <div class="section_title">${repo.name}</div>
                        <div class="about_section">
                            <span style="display:block;">${description}</span>
                        </div>
                        <div class="bottom_section">
                            <span style="display:inline-block;"><i class="fas fa-code"></i>&nbsp; ${language}</span>
                            <span><i class="fas fa-star"></i>&nbsp; ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i>&nbsp; ${repo.forks_count}</span>
                        </div>
                    </section>
                </a>
            `;
            reposContainer.innerHTML += projectHTML;
        });
    })
    .catch(error => {
        console.error('Erro ao buscar repositórios:', error);
        reposContainer.innerHTML = '<p>Não foi possível carregar os projetos do GitHub no momento.</p>';
    });
});