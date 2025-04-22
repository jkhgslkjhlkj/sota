document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const baseModel = document.getElementById('base-model');
    const bodyItemLayer = document.getElementById('body-item');
    const headItemLayer = document.getElementById('head-item');
    const clothItemLayer = document.getElementById('cloth-item');
    const starItemLayer = document.getElementById('star-item');
    const accessoryItemLayer = document.getElementById('accessory-item');
    const bodyItems = document.getElementById('body-items');
    const clothItems = document.getElementById('cloth-items');
    const effectItems = document.getElementById('effect-items');
    const resetModelBtn = document.getElementById('reset-model');
    const model = document.querySelector('.model');
    const collapsibleSections = document.querySelectorAll('.collapsible-section');
    const allButtons = document.querySelectorAll('button');
    const allClickableItems = document.querySelectorAll('.item, .category-header, button');
    
    // Текущие выбранные элементы
    let currentBodyItem = null;
    let currentHeadItem = null;
    let currentClothItem = null;
    let currentStarItem = null;
    
    // По умолчанию открываем первую секцию
    if (collapsibleSections.length > 0) {
        collapsibleSections[0].classList.add('active');
    }
    
    // Обработчики для сворачиваемых разделов
    collapsibleSections.forEach(section => {
        const header = section.querySelector('.category-header');
        header.addEventListener('click', toggleSection);
    });
    
    // Создание изображения с плавным появлением
    function createImage(src) {
        const img = document.createElement('img');
        img.src = src;
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        
        // Добавляем анимацию появления после загрузки изображения
        img.onload = function() {
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 50);
        };
        
        return img;
    }
    
    // Функция для обработки выбора элемента
    function handleItemSelection(item, itemType) {
        const itemSrc = item.dataset.item;
        const type = item.dataset.type;
        
        // Визуальный отклик при клике
        animateClick(item);
        
        // Определяем целевой слой и коллекцию элементов на основе типа
        let targetLayer, itemsCollection, currentItemVar;
        
        if (type === 'body') {
            targetLayer = bodyItemLayer;
            itemsCollection = bodyItems.querySelectorAll('.item');
            currentItemVar = 'currentBodyItem';
            
            // Скрываем базовую модель при выборе нового тела
            if (baseModel) {
                baseModel.style.opacity = '0';
                baseModel.style.transform = 'scale(0.95)';
            }
        } else if (type === 'cloth') {
            targetLayer = clothItemLayer;
            itemsCollection = clothItems.querySelectorAll('.item');
            currentItemVar = 'currentClothItem';
        } else if (type === 'star') {
            targetLayer = starItemLayer;
            itemsCollection = effectItems.querySelectorAll('.item[data-type="star"]');
            currentItemVar = 'currentStarItem';
        } else {
            return; // Неизвестный тип
        }
        
        // Удаление активного класса со всех элементов этого типа
        itemsCollection.forEach(i => {
            if (i.dataset.type === type) {
                i.classList.remove('active');
            }
        });
        
        // Добавление активного класса к текущему элементу
        item.classList.add('active');
        
        // Очистка целевого слоя с плавным исчезновением
        const currentImage = targetLayer.querySelector('img');
        if (currentImage) {
            currentImage.style.opacity = '0';
            currentImage.style.transform = 'scale(0.95)';
            
            // Ждем завершения анимации перед удалением
            setTimeout(() => {
                targetLayer.innerHTML = '';
                
                // Добавление нового изображения на слой
                const img = createImage(`images/${itemSrc}`);
                targetLayer.appendChild(img);
                
                // Если выбрана базовая модель как тело, показываем исходную модель
                if (type === 'body' && itemSrc === 'body chell.png') {
                    if (baseModel) {
                        baseModel.style.opacity = '1';
                        baseModel.style.transform = 'scale(1)';
                    }
                }
            }, 200);
        } else {
            // Если слой пуст, просто добавляем новое изображение
            const img = createImage(`images/${itemSrc}`);
            targetLayer.appendChild(img);
            
            // Если выбрана базовая модель как тело, показываем исходную модель
            if (type === 'body' && itemSrc === 'body chell.png') {
                if (baseModel) {
                    baseModel.style.opacity = '1';
                    baseModel.style.transform = 'scale(1)';
                }
            }
        }
        
        // Обновление текущего элемента
        window[currentItemVar] = itemSrc;
    }
    
    // Функция для анимации клика на элементе
    function animateClick(element) {
        // Создаем эффект пульсации
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Позиционируем эффект в месте клика
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Добавляем эффект к элементу
        element.appendChild(ripple);
        
        // Удаляем эффект после анимации
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Обработчики для выбора элементов
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            handleItemSelection(this, this.dataset.type);
        });
    });
    
    // Анимация для кнопки сброса при наведении
    if (resetModelBtn) {
        resetModelBtn.addEventListener('mouseenter', function() {
            const btnIcon = this.querySelector('.btn-icon');
            if (btnIcon) {
                btnIcon.style.transform = 'rotate(180deg)';
            }
        });
        
        resetModelBtn.addEventListener('mouseleave', function() {
            const btnIcon = this.querySelector('.btn-icon');
            if (btnIcon) {
                btnIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Обработчик для кнопки сброса модели
        resetModelBtn.addEventListener('click', function() {
            // Анимация клика
            animateClick(this);
            
            // Плавное исчезновение всех элементов перед удалением
            const layers = [bodyItemLayer, headItemLayer, clothItemLayer, starItemLayer, accessoryItemLayer];
            
            layers.forEach(layer => {
                const img = layer.querySelector('img');
                if (img) {
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.95)';
                }
            });
            
            // Ждем завершения анимации перед удалением
            setTimeout(() => {
                // Очистка всех слоев
                layers.forEach(layer => {
                    layer.innerHTML = '';
                });
                
                // Показываем базовую модель
                if (baseModel) {
                    baseModel.style.opacity = '1';
                    baseModel.style.transform = 'scale(1)';
                }
                
                // Удаление активных классов со всех элементов
                document.querySelectorAll('.item').forEach(i => i.classList.remove('active'));
                
                // Сброс текущих выбранных элементов
                currentBodyItem = null;
                currentHeadItem = null;
                currentClothItem = null;
                currentStarItem = null;
            }, 200);
        });
    }
    
    // Функция предзагрузки изображений
    function preloadImages() {
        const images = [
            'images/body chell.png',
            'images/negro.png',
            'images/metalic.png',
            'images/starchell.png',
            'images/idkez.png',
            'images/idk22z.png',
            'images/star 2.png',
            'images/hell chell.png',
            'images/hoodie chell.png',
            'images/opm chell.png',
            'images/keny chell.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Toggle the section to show/hide items
    function toggleSection(event) {
        const section = event.currentTarget.closest('.collapsible-section');
        
        // Анимация клика на заголовке
        animateClick(event.currentTarget);
        
        // Просто переключаем состояние активности раздела
        section.classList.toggle('active');
    }
    
    // Инициализация анимаций при наведении
    function initAnimations() {
        // Добавляем обработчики анимаций при наведении на элементы
        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Предзагружаем изображения при загрузке страницы
    preloadImages();
    
    // Инициализация анимаций
    initAnimations();
}); 