function initTooltip() {
	const tooltips = Array.from(document.querySelectorAll('[data-tooltip-container]'));

	tooltips.map(tooltip => {
		tooltip.addEventListener('mouseover', handleMouseOver);
	})

	function handleMouseOver() {
		const tooltipbox = createTooltipBox(this);

		handleMouseMove.tooltipbox = tooltipbox;
		this.addEventListener('mousemove', handleMouseMove);

		handleMouseLeave.tooltipbox = tooltipbox;
		handleMouseLeave.element = this;
		this.addEventListener('mouseleave', handleMouseLeave);
	}

	const handleMouseLeave = {
		handleEvent() {
			this.tooltipbox.remove();
			for (let i=0; i < document.getElementsByClassName('tooltip').length; i++){
				document.body.removeChild(document.getElementsByClassName('tooltip')[i]);
			}
			this.element.removeEventListener('mousemove', handleMouseMove);
			this.element.removeEventListener('mouseleave', handleMouseLeave);
		}
	}

	const handleMouseMove = {
		handleEvent(e) {
			this.tooltipbox.style.top = e.clientY + 25 + 'px';
			this.tooltipbox.style.left = e.clientX - 250 +'px';
			this.tooltipbox.style.zIndex = '1002';
		}
	}

	function createTooltipBox(el) {
		let tooltip = document.createElement('div');
		tooltip.innerText = el.getAttribute('data-tooltip-label');
		tooltip.classList.add('tooltip');

		document.body.appendChild(tooltip);
		
		return tooltip;
	}

}

initTooltip();