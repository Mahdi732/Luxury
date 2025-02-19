window.addEventListener('DOMContentLoaded', () => {
    gsap.from('.card-hover-effect', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    document.addEventListener('mousemove', (e) => {
        const moveX = (e.pageX - window.innerWidth/2) * 0.01;
        const moveY = (e.pageY - window.innerHeight/2) * 0.01;
        
        gsap.to('.parallax-bg', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power2.out'
        });
    });

    const stats = document.querySelectorAll('.text-4xl');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 2,
                    opacity: 1,
                    y: 0,
                    ease: 'power3.out'
                });
            }
        });
    });

    stats.forEach(stat => {
        gsap.set(stat, { opacity: 0, y: 20 });
        observer.observe(stat);
    });
});

const filters = document.querySelectorAll('select');
filters.forEach(filter => {
    filter.addEventListener('change', () => {
        gsap.to('.card-hover-effect', {
            duration: 0.3,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to('.card-hover-effect', {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
});

let categorySelect = document.getElementById("categorySelect");
let vehiculecontainer = document.querySelector(".vehiculecontainer");

categorySelect.addEventListener('change', () => {
    let categorie = categorySelect.value;
    let conn = new XMLHttpRequest();
    conn.open('GET', `../classes/filter_vehiculs.php?categorie_sel=${categorie}`);
    conn.send();
    conn.onload = _ => {
        if (conn.status === 200) {
            let vehicles = JSON.parse(conn.responseText);
            vehiculecontainer.innerHTML = "";

            if (vehicles.length > 0) {
                vehicles.forEach(v => {
                    vehiculecontainer.innerHTML += `
                    <div class="card-hover-effect">
                        <div class="gradient-border">
                            <div class="bg-black rounded-xl overflow-hidden">
                            <form action="../pages/vehiculesinfo.php" method="POST">
                                    <input type="hidden" name="id_info" value="${v.vehicle_id}">
                                    <button type="submit" class="absolute top-2 left-2 z-10 p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-500 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                    </button>
                                </form>
                                <div class="relative">
                                    <img 
                                        src="${v.image_url}" 
                                        alt="${v.model}" 
                                        class="w-full h-64 object-cover"
                                    >
                                    <div class="absolute top-4 right-4">
                                        <span class="px-3 py-1 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-full text-sm backdrop-blur-xl">
                                            Supercar
                                        </span>
                                    </div>
                                </div>
                                <div class="p-6 space-y-4">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h3 class="text-xl font-bold text-white">${v.model}</h3>
                                            <p class="text-gray-400">${v.Marque}</p>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            <span class="text-white font-medium">4.9</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">${v.price}</span>
                                            <span class="text-gray-400">/jour</span>
                                        </div>
                                        <input type="hidden" value="${v.vehicle_id}">
                                        <button class="px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-300">
                                            Réserver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
            } else {
                vehiculecontainer.innerHTML = `<p class="text-white">Aucun véhicule trouvé.</p>`;
            }
        }
    };
});


let shercheByName = document.getElementById('sherche_dy');
shercheByName.addEventListener('input', _ =>{
    let chercheByNames = shercheByName.value;
    let conn = new XMLHttpRequest();
    conn.open('GET', `../classes/cherche_by_name.php?cherche_value=${chercheByNames}`);
    conn.send();
    conn.onload = _ =>{
        if (conn.status === 200) {
            console.log(conn.responseText);
            let cherche = JSON.parse(conn.responseText);
            vehiculecontainer.innerHTML = "";
            if (cherche.length > 0) {
                cherche.forEach(cher => {
                    vehiculecontainer.innerHTML += `
                    <div class="card-hover-effect">
                        <div class="gradient-border">
                            <div class="bg-black rounded-xl overflow-hidden">
                            <form action="../pages/vehiculesinfo.php" method="POST">
                                    <input type="hidden" name="id_info" value="${cher.vehicle_id}">
                                    <button type="submit" class="absolute top-2 left-2 z-10 p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-500 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                    </button>
                                </form>
                                <div class="relative">
                                    <img 
                                        src="${cher.image_url}" 
                                        alt="${cher.model}" 
                                        class="w-full h-64 object-cover"
                                    >
                                    <div class="absolute top-4 right-4">
                                        <span class="px-3 py-1 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-full text-sm backdrop-blur-xl">
                                            Supercar
                                        </span>
                                    </div>
                                </div>
                                <div class="p-6 space-y-4">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h3 class="text-xl font-bold text-white">${cher.model}</h3>
                                            <p class="text-gray-400">${cher.Marque}</p>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            <span class="text-white font-medium">4.9</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">${cher.price}</span>
                                            <span class="text-gray-400">/jour</span>
                                        </div>
                                        <input type="hidden" value="${cher.vehicle_id}">
                                        <button class="px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-300">
                                            Réserver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                })
            }
        }
    }
    
});


let paginationButtons = document.querySelectorAll('.pagination-button');
paginationButtons.forEach(button => {
    button.addEventListener('click', _ => {
        let paginationButtonValue = button.value;
        let conn = new XMLHttpRequest();
        button.disabled = true; 
        conn.open('GET', `../classes/pagination.php?paginationPage=${paginationButtonValue}`);
        conn.send();
        conn.onload = _ => {
            button.disabled = false; 
            if (conn.status === 200) {
                    let result = JSON.parse(conn.responseText);
                    vehiculecontainer.innerHTML = ""; 
                    if (result.length > 0) {
                        result.forEach(paginationAffiche => {
                            vehiculecontainer.innerHTML += `
                                <div class="card-hover-effect">
                                    <div class="gradient-border">
                                        <div class="bg-black rounded-xl overflow-hidden">
                                            <form action="../pages/vehiculesinfo.php" method="POST">
                                                <input type="hidden" name="id_info" value="${paginationAffiche.vehicle_id}">
                                                <button type="submit" class="absolute top-2 left-2 z-10 p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-500 transition-all duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            </form>
                                            <div class="relative">
                                                <img src="${paginationAffiche.image_url}" alt="${paginationAffiche.model}" class="w-full h-64 object-cover">
                                                <div class="absolute top-4 right-4">
                                                    <span class="px-3 py-1 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-full text-sm backdrop-blur-xl">
                                                        Supercar
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="p-6 space-y-4">
                                                <div class="flex justify-between items-start">
                                                    <div>
                                                        <h3 class="text-xl font-bold text-white">${paginationAffiche.model}</h3>
                                                        <p class="text-gray-400">${paginationAffiche.Marque}</p>
                                                    </div>
                                                    <div class="flex items-center space-x-1">
                                                        <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                        </svg>
                                                        <span class="text-white font-medium">4.9</span>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between items-center">
                                                    <div>
                                                        <span class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">${paginationAffiche.price}</span>
                                                        <span class="text-gray-400">/jour</span>
                                                    </div>
                                                    <input type="hidden" value="${paginationAffiche.vehicle_id}">
                                                    <button class="px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-300">
                                                        Réserver
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                        });
                    } else {
                        vehiculecontainer.innerHTML = "<p class='text-gray-400'>No vehicles available for this page.</p>";
                    }
            }
        };
    });
});
