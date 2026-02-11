// Form Builder JavaScript

let fieldCount = 0;
const fields = [];

// Open field modal
function openFieldModal() {
    document.getElementById('field-modal').classList.add('active');
}

// Close field modal
function closeFieldModal() {
    document.getElementById('field-modal').classList.remove('active');
    document.getElementById('field-form').reset();
    document.getElementById('options-group').classList.add('hidden');
}

// Add field from modal
function addFieldFromModal() {
    const label = document.getElementById('field-label').value;
    const type = document.getElementById('field-type').value;
    const help = document.getElementById('field-help').value;
    const required = document.getElementById('field-required').checked;
    const options = document.getElementById('field-options').value
        .split('\n')
        .filter(opt => opt.trim());

    if (!label) {
        showAlert('Please enter a field label', 'danger');
        return;
    }

    addField(type, label, help, required, options);
    closeFieldModal();
}

// Add field to form
function addField(type, label = '', help = '', required = true, options = []) {
    fieldCount++;
    const fieldId = `field-${fieldCount}`;
    
    const field = {
        id: fieldId,
        type: type,
        label: label || getFieldTypeLabel(type),
        help: help,
        required: required,
        options: options
    };
    
    fields.push(field);
    renderFields();
}

// Get default label for field type
function getFieldTypeLabel(type) {
    const labels = {
        'text': 'Short Text',
        'textarea': 'Long Text',
        'email': 'Email',
        'number': 'Number',
        'select': 'Dropdown',
        'checkbox': 'Checkbox',
        'radio': 'Radio Button',
        'date': 'Date',
        'file': 'File Upload'
    };
    return labels[type] || type;
}

// Render all fields
function renderFields() {
    const container = document.getElementById('fields-container');
    
    if (fields.length === 0) {
        container.innerHTML = '<div class="text-center" style="padding: 2rem; color: var(--text-light);"><p>No fields added yet. Click "Add Field" to get started.</p></div>';
        return;
    }

    container.innerHTML = fields.map((field, index) => `
        <div class="field-item" style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 0.375rem; margin-bottom: 1rem; background: white;">
            <div style="display: flex; gap: 1rem;">
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <h4 style="margin: 0; color: var(--text-dark);">${field.label}</h4>
                        ${field.required ? '<span class="badge badge-danger" style="background-color: #fee2e2; color: #991b1b;">Required</span>' : ''}
                        <span class="badge badge-primary">${getFieldTypeLabel(field.type)}</span>
                    </div>
                    ${field.help ? `<p style="margin: 0.5rem 0 0 0; color: var(--text-light); font-size: 0.875rem;">${field.help}</p>` : ''}
                    ${renderFieldPreview(field)}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-sm" style="background: none; border: 1px solid var(--border-color); padding: 0.5rem;" onclick="editField(${index})">✏️</button>
                    <button class="btn btn-sm" style="background: none; border: 1px solid var(--border-color); padding: 0.5rem; color: var(--danger-color);" onclick="deleteField(${index})">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render field preview
function renderFieldPreview(field) {
    switch(field.type) {
        case 'text':
        case 'email':
        case 'number':
            return `<input type="${field.type === 'text' ? 'text' : field.type}" class="form-control" placeholder="Example input" disabled style="margin-top: 0.75rem;">`;
        
        case 'textarea':
            return `<textarea class="form-control" placeholder="Example long text" disabled style="margin-top: 0.75rem;"></textarea>`;
        
        case 'select':
        case 'radio':
        case 'checkbox':
            const inputType = field.type === 'select' ? 'select' : field.type;
            const optionsHtml = field.options.length > 0 
                ? field.options.map(opt => `<option>${opt}</option>`).join('')
                : '<option>Option 1</option><option>Option 2</option>';
            
            if (inputType === 'select') {
                return `<select class="form-control" disabled style="margin-top: 0.75rem;">${optionsHtml}</select>`;
            } else {
                return `<div style="margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${(field.options.length > 0 ? field.options : ['Option 1', 'Option 2']).map(opt => `
                        <div class="form-check">
                            <input type="${inputType}" disabled>
                            <label class="form-check-label">${opt}</label>
                        </div>
                    `).join('')}
                </div>`;
            }
        
        case 'date':
            return `<input type="date" class="form-control" disabled style="margin-top: 0.75rem;">`;
        
        case 'file':
            return `<input type="file" class="form-control" disabled style="margin-top: 0.75rem;">`;
        
        default:
            return '';
    }
}

// Edit field
function editField(index) {
    const field = fields[index];
    document.getElementById('field-label').value = field.label;
    document.getElementById('field-type').value = field.type;
    document.getElementById('field-help').value = field.help;
    document.getElementById('field-required').checked = field.required;
    document.getElementById('field-options').value = field.options.join('\n');
    
    // Show options group if field type supports it
    const optionsGroup = document.getElementById('options-group');
    if (['select', 'radio', 'checkbox'].includes(field.type)) {
        optionsGroup.classList.remove('hidden');
    } else {
        optionsGroup.classList.add('hidden');
    }
    
    deleteField(index);
    openFieldModal();
}

// Delete field
function deleteField(index) {
    fields.splice(index, 1);
    renderFields();
}

// Show options group based on field type
document.getElementById('field-type')?.addEventListener('change', function() {
    const optionsGroup = document.getElementById('options-group');
    if (['select', 'radio', 'checkbox'].includes(this.value)) {
        optionsGroup.classList.remove('hidden');
    } else {
        optionsGroup.classList.add('hidden');
    }
});

// Save form
function saveForm() {
    const title = document.getElementById('form-title').value;
    const description = document.getElementById('form-description').value;
    const isActive = document.getElementById('form-active').checked;

    if (!title) {
        showAlert('Please enter a form title', 'danger');
        return;
    }

    if (fields.length === 0) {
        showAlert('Please add at least one field', 'danger');
        return;
    }

    const formData = {
        title: title,
        description: description,
        is_active: isActive,
        form_data: fields
    };

    // Save to localStorage for demo
    localStorage.setItem('form_data', JSON.stringify(formData));
    showAlert('Form saved successfully!', 'success');
    
    // In a real app, send to API
    // fetch('/api/forms/', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // })
}

// Preview form
function previewForm() {
    const previewData = {
        title: document.getElementById('form-title').value,
        description: document.getElementById('form-description').value,
        fields: fields
    };
    
    localStorage.setItem('form_preview', JSON.stringify(previewData));
    window.open('/forms/preview/', '_blank');
}

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset all fields?')) {
        document.getElementById('form-builder').reset();
        fields.length = 0;
        fieldCount = 0;
        renderFields();
        showAlert('Form reset successfully', 'success');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderFields();
});
