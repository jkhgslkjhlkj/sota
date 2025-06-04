document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
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
    
    // Current selected items
    let currentBodyItem = null;
    let currentHeadItem = null;
    let currentClothItem = null;
    let currentStarItem = null;
    
    // By default, open the first section
    if (collapsibleSections.length > 0) {
        collapsibleSections[0].classList.add('active');
    }
    
    // Event handlers for collapsible sections
    collapsibleSections.forEach(section => {
        const header = section.querySelector('.category-header');
        header.addEventListener('click', toggleSection);
    });
    
    // Create image with smooth appearance
    function createImage(src) {
        const img = document.createElement('img');
        img.src = src;
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        
        // Add appearance animation after image loads
        img.onload = function() {
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 50);
        };
        
        return img;
    }
    
    // Function to handle item selection
    function handleItemSelection(item, itemType) {
        const itemSrc = item.dataset.item;
        const type = item.dataset.type;
        
        // Visual response when clicked
        animateClick(item);
        
        // Determine target layer and item collection based on type
        let targetLayer, itemsCollection, currentItemVar;
        
        if (type === 'body') {
            targetLayer = bodyItemLayer;
            itemsCollection = bodyItems.querySelectorAll('.item');
            currentItemVar = 'currentBodyItem';
            
            // Hide base model when selecting a new body
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
            return; // Unknown type
        }
        
        // Remove active class from all items of this type
        itemsCollection.forEach(i => {
            if (i.dataset.type === type) {
                i.classList.remove('active');
            }
        });
        
        // Add active class to current item
        item.classList.add('active');
        
        // Clear target layer with smooth disappearance
        const currentImage = targetLayer.querySelector('img');
        if (currentImage) {
            currentImage.style.opacity = '0';
            currentImage.style.transform = 'scale(0.95)';
            
            // Wait for animation to complete before removing
            setTimeout(() => {
                targetLayer.innerHTML = '';
                
                // Add new image to layer
                const img = createImage(`images/${itemSrc}`);
                targetLayer.appendChild(img);
                
                // If base model selected as body, show original model
                if (type === 'body' && itemSrc === 'body chell.png') {
                    if (baseModel) {
                        baseModel.style.opacity = '1';
                        baseModel.style.transform = 'scale(1)';
                    }
                }
            }, 200);
        } else {
            // If layer is empty, just add new image
            const img = createImage(`images/${itemSrc}`);
            targetLayer.appendChild(img);
            
            // If base model selected as body, show original model
            if (type === 'body' && itemSrc === 'body chell.png') {
                if (baseModel) {
                    baseModel.style.opacity = '1';
                    baseModel.style.transform = 'scale(1)';
                }
            }
        }
        
        // Update current item
        window[currentItemVar] = itemSrc;
    }
    
    // Function to animate click on element
    function animateClick(element) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Position effect at click point
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Add effect to element
        element.appendChild(ripple);
        
        // Remove effect after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Event handlers for selecting items
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            handleItemSelection(this, this.dataset.type);
        });
    });
    
    // Animation for reset button on hover
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
        
        // Event handler for reset model button
        resetModelBtn.addEventListener('click', function() {
            // Click animation
            animateClick(this);
            
            // Smooth fade-out of all elements before removing
            const layers = [bodyItemLayer, headItemLayer, clothItemLayer, starItemLayer, accessoryItemLayer];
            
            layers.forEach(layer => {
                const img = layer.querySelector('img');
                if (img) {
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.95)';
                }
            });
            
            // Wait for animation to complete before removing
            setTimeout(() => {
                // Clear all layers
                layers.forEach(layer => {
                    layer.innerHTML = '';
                });
                
                // Show base model
                if (baseModel) {
                    baseModel.style.opacity = '1';
                    baseModel.style.transform = 'scale(1)';
                }
                
                // Remove active classes from all items
                document.querySelectorAll('.item').forEach(i => i.classList.remove('active'));
                
                // Reset current selected items
                currentBodyItem = null;
                currentHeadItem = null;
                currentClothItem = null;
                currentStarItem = null;
            }, 200);
        });
    }
    
    // Function to preload images
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
        
        // Click animation on header
        animateClick(event.currentTarget);
        
        // Simply toggle active state of section
        section.classList.toggle('active');
    }
    
    // Initialize hover animations
    function initAnimations() {
        // Add hover animation handlers to items
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
    
    // Preload images when page loads
    preloadImages();
    
    // Initialize animations
    initAnimations();
    
    // FAQ accordion logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
}); 