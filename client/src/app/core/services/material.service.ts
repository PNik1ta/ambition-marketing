import { ElementRef } from "@angular/core";

export interface MaterialInstance {
	open?(): void;
	close?(): void;
	destroy?(): void;
}

export interface MaterialTimePicker extends MaterialInstance {
	time?: string;
}

export interface MaterialDatePicker extends MaterialInstance {
	date?: string;
}

declare var M: any;

export class MaterialService {
	static toast(message: string): void {
		M.toast({ html: message });
	}

	static initializeFloatingButton(ref: ElementRef): void {
		M.FloatingActionButton.init(ref.nativeElement);
	}

	static updateTextIputs(): void {
		M.updateTextFields();
	}

	static initModal(ref: ElementRef): MaterialInstance {
		return M.Modal.init(ref.nativeElement);
	}

	static initSelect(ref: ElementRef): MaterialInstance {
		return M.FormSelect.init(ref.nativeElement);
	}

	static initTooltip(ref: ElementRef): MaterialInstance {
		return M.Tooltip.init(ref.nativeElement);
	}

	static initDatepicker(ref: ElementRef, onClose: () => void): MaterialInstance {
		return M.Datepicker.init(ref.nativeElement, {
			format: 'dd.mm.yyyy',
			showClearBtn: true,
			onClose
		});
	}

	static initTimepicker(ref: ElementRef, onClose: () => void, onSelect: () => void): MaterialInstance {
		return M.Timepicker.init(ref.nativeElement, {
			showClearBtn: true,
			onClose
		});
	}

	static initTapTarget(ref: ElementRef): MaterialInstance {
		return M.TapTarget.init(ref.nativeElement);
	}

	static initSideNav(ref: ElementRef): MaterialInstance {
		return M.Sidenav.init(ref.nativeElement);
	}
}
