import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { nextTick } from 'vue'

describe('TaskItem.vue', () => {
  it('permet l\'édition d\'une tâche et émet l\'événement update-task', async () => {
    const task = { id: 1, title: 'Tâche initiale', completed: false }
    const wrapper = mount(TaskItem, {
      props: { task },
      global: {
        stubs: ['Icon']
      }
    })

    // Vérifier que le mode d'édition est initialement désactivé
    expect(wrapper.vm.isEditing).toBe(false)

    // Trouver et cliquer sur le bouton d'édition
    const editButton = wrapper.find('button.text-blue-500')
    await editButton.trigger('click')

    // Vérifier que le mode d'édition est activé
    expect(wrapper.vm.isEditing).toBe(true)

    // Trouver l'input d'édition et changer sa valeur
    const editInput = wrapper.find('input[type="text"]')
    await editInput.setValue('Tâche modifiée')

    // Simuler la soumission du formulaire
    await wrapper.find('form').trigger('submit.prevent')

    // Vérifier que l'événement update-task a été émis avec les bonnes données
    expect(wrapper.emitted('update-task')).toBeTruthy()
    expect(wrapper.emitted('update-task')[0]).toEqual([
      { id: 1, title: 'Tâche modifiée', completed: false }
    ])

    // Vérifier que le mode d'édition est désactivé après la soumission
    expect(wrapper.vm.isEditing).toBe(false)

    // Vérifier que le titre affiché a été mis à jour
    await nextTick()
    expect(wrapper.find('.task-title').text()).toBe('Tâche modifiée')
  })

  it('annule l\'édition lorsque la touche Escape est pressée', async () => {
    const task = { id: 1, title: 'Tâche initiale', completed: false }
    const wrapper = mount(TaskItem, {
      props: { task },
      global: {
        stubs: ['Icon']
      }
    })

    // Activer le mode d'édition
    await wrapper.find('button.text-blue-500').trigger('click')

    // Changer la valeur de l'input
    const editInput = wrapper.find('input[type="text"]')
    await editInput.setValue('Tâche non sauvegardée')

    // Simuler l'appui sur la touche Escape
    await editInput.trigger('keyup.escape')

    // Vérifier que le mode d'édition est désactivé
    expect(wrapper.vm.isEditing).toBe(false)

    // Vérifier que le titre n'a pas changé
    expect(wrapper.find('.task-title').text()).toBe('Tâche initiale')
  })
})
