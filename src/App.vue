<template>
  <main class="customBg relative overflow-hidden min-h-screen bg-[#e6e6e6] text-customBlack font-satoshi font-bold flex items-center justify-center p-4">
    <img src="./assets/lines/CHA_DO-CIARY-1-O-60perc.png" alt="Background" class="bg-orangeLine" draggable="false">
    <img src="./assets/lines/CHA_DO-CIARY-2-C.png" alt="Background" class="bg-blackLine" draggable="false">
    <img src="./assets/lines/CHA_DO-CIARY-7-S-30.png" alt="Background" class="bg-grayLine" draggable="false">

    <div class="w-full max-w-4xl overflow-hidden z-10">
      <div class="p-8">
        <h2 class="text-3xl mb-6 text-center">Dotazník preferencí čaje</h2>

        <div v-if="!resultsVisible">
          <!-- Progress Bar -->
          <div class="mb-8">
            <div class="flex justify-between mb-2">
            <span v-for="(step, index) in steps" :key="index" class="text-xs" :class="{ 'text-[#67b9f3]': currentStep >= index + 1, 'text-customBlack': currentStep < index + 1 }">
              {{ step }}
            </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                  class="bg-[#67b9f3] h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  :class="[currentStep === 6 ? 'opacity-100' : 'opacity-40']"
                  :style="{ width: `${(currentStep / steps.length) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Step 1: Chuťové preference -->
          <div v-if="currentStep === 1" class="space-y-4">
            <h3 class="text-xl mb-4">1. Chuťové preference</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label
                  v-for="flavor in flavors"
                  :key="flavor.name"
                  class="input-card"
                  :class="[
                  formData.flavors.includes(flavor.name) ? 'border border-customBlack shadow-md' : '',
                  hasError && !formData.flavors.length ? 'wiggle border border-customOrange' : ''
                ]"
              >
                <input type="checkbox" v-model="formData.flavors" :value="flavor.name" class="form-checkbox h-5 w-5 text-[#67b9f3] hidden">
                <component :is="flavor.icon" class="h-8 w-8 mb-2" :class="formData.flavors.includes(flavor.name) ? 'text-[#67b9f3]' : 'text-gray-500'" />
                <span class="text-sm text-center" :class="formData.flavors.includes(flavor.name) ? '' : 'text-gray-700'">{{ flavor.name }}</span>
              </label>
            </div>
          </div>

          <!-- Step 2: Preference kofeinu -->
          <div v-if="currentStep === 2" class="space-y-4">
            <h3 class="text-xl mb-4">2. Preference kofeinu</h3>
            <div class="grid grid-cols-2 gap-4">
              <label
                  v-for="caffeine in caffeineOptions"
                  :key="caffeine.name"
                  class="input-card"
                  :class="[
                  formData.caffeine.includes(caffeine.name) ? 'border border-customBlack shadow-md' : '',
                  hasError && !formData.caffeine.length ? 'wiggle border border-customOrange' : ''
                ]"
              >
                <input type="radio" v-model="formData.caffeine" :value="caffeine.name" class="form-radio h-5 w-5 text-[#67b9f3] hidden">
                <component :is="caffeine.icon" class="h-8 w-8 mb-2" :class="formData.caffeine === caffeine.name ? 'text-[#67b9f3]' : 'text-gray-500'" />
                <span class="text-sm text-center" :class="formData.caffeine === caffeine.name ? '' : 'text-gray-700'">{{ caffeine.name }}</span>
              </label>
            </div>
          </div>

          <!-- Step 3: Zdraví a wellness cíle -->
          <div v-if="currentStep === 3" class="space-y-4">
            <h3 class="text-xl mb-4">3. Zdraví a wellness cíle</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label
                  v-for="goal in healthGoals"
                  :key="goal.name"
                  class="input-card"
                  :class="[
                  formData.healthGoals.includes(goal.name) ? 'border border-customBlack shadow-md' : '',
                  hasError && !formData.healthGoals.length ? 'wiggle border border-customOrange' : ''
                ]"
              >
                <input type="checkbox" v-model="formData.healthGoals" :value="goal.name" class="form-checkbox h-5 w-5 text-[#67b9f3] hidden">
                <component :is="goal.icon" class="h-8 w-8 mb-2" :class="formData.healthGoals.includes(goal.name) ? 'text-[#67b9f3]' : 'text-gray-500'" />
                <span class="text-sm text-center" :class="formData.healthGoals.includes(goal.name) ? '' : 'text-gray-700'">{{ goal.name }}</span>
              </label>
            </div>
          </div>

          <!-- Step 4: Příležitost nebo denní doba -->
          <div v-if="currentStep === 4" class="space-y-4">
            <h3 class="text-xl mb-4">4. Příležitost nebo denní doba</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label
                  v-for="time in timesOfDay"
                  :key="time.name"
                  class="input-card"
                  :class="[
                  formData.timesOfDay.includes(time.name) ? 'border border-customBlack shadow-md' : '',
                  hasError && !formData.timesOfDay.length ? 'wiggle border border-customOrange' : ''
                ]"
              >
                <input type="checkbox" v-model="formData.timesOfDay" :value="time.name" class="form-checkbox h-5 w-5 text-[#67b9f3] hidden">
                <component :is="time.icon" class="h-8 w-8 mb-2" :class="formData.timesOfDay.includes(time.name) ? 'text-[#67b9f3]' : 'text-gray-500'" />
                <span class="text-sm text-center" :class="formData.timesOfDay.includes(time.name) ? '' : 'text-gray-700'">{{ time.name }}</span>
              </label>
            </div>
          </div>

          <!-- Step 5: Preference teploty -->
          <div v-if="currentStep === 5" class="space-y-4">
            <h3 class="text-xl mb-4">5. Preference teploty</h3>
            <div class="grid grid-cols-3 gap-4">
              <label
                  v-for="temp in temperatureOptions"
                  :key="temp.name"
                  class="input-card"
                  :class="[
                  formData.temperature.includes(temp.name) ? 'border border-customBlack shadow-md' : '',
                  hasError && !formData.temperature.length ? 'wiggle border border-customOrange' : ''
                ]"
              >
                <input type="radio" v-model="formData.temperature" :value="temp.name" class="form-radio h-5 w-5 text-[#67b9f3] hidden">
                <component :is="temp.icon" class="h-8 w-8 mb-2" :class="formData.temperature === temp.name ? 'text-[#67b9f3]' : 'text-gray-500'" />
                <span class="text-sm text-center" :class="formData.temperature === temp.name ? '' : 'text-gray-700'">{{ temp.name }}</span>
              </label>
            </div>
          </div>

          <!-- Step 6: Summary -->
          <div v-if="currentStep === 6" class="space-y-6">
            <h3 class="text-xl mb-4">Shrnutí vašich preferencí</h3>

            <div class="grid grid-cols-3">
              <div v-for="(value, key) in formData" :key="key" class="border-b pb-4">
                <h4 class="font-medium text-gray-500 text-xs">{{ getStepTitle(key) }}</h4>
                <p v-if="Array.isArray(value)" class="text-gray-800 text-lg">
                  {{ value.join(', ') }}
                </p>
                <p v-else class="text-gray-800 text-lg">{{ value }}</p>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="mt-8 flex justify-between">
            <button
                v-if="currentStep > 1"
                @click="prevStep"
                class="secondary-button"
            >
              Zpět
            </button>
            <button
                v-if="currentStep < steps.length"
                @click="nextStep"
                class="primary-button"
            >
              Další
            </button>
            <button
                v-if="currentStep === steps.length"
                @click="submitForm"
                class="primary-button"
            >
              Zjistit ideální čaje
              <CheckIcon class="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>

        <div v-else>
          <h3 class="text-xl mb-2 text-center opacity-80">Váš ideální čaj zodpovedá naší kolekci</h3>

          <div class="max-w-sm mx-auto flex flex-col items-center justify-center p-4 border border-gray-300 rounded-[10px]">
              {{ getTeaPersonality() }}
          </div>

          <div class="flex justify-center items-center gap-2 mt-8">
            <button @click="reset" class="secondary-button">
              Resetovat
            </button>
            <a href="#" target="_blank" class="primary-button">
              Procházet kolekci na našem eshopu
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  CloudIcon,
  CheckIcon,
  FlowerIcon,
  AppleIcon,
  CandyIcon,
  NutIcon,
  LeafIcon,
  FlameIcon,
  BatteryFullIcon,
  BatteryMediumIcon,
  BatteryLowIcon,
  BatteryIcon,
  ZapIcon,
  HeartPulseIcon,
  BrainIcon,
  HeartHandshakeIcon,
  MoonIcon,
  ScaleIcon,
  SunriseIcon,
  SunIcon,
  SunsetIcon,
  BedIcon,
  ClockIcon,
  ThermometerIcon,
  IceCreamIcon,
  CoffeeIcon,
  SnowflakeIcon
} from 'lucide-vue-next'

const steps = ['Chuť', 'Kofein', 'Zdraví', 'Doba', 'Teplota', 'Shrnutí']
const currentStep = ref(1)
const hasError = ref(false)
const resultsVisible = ref(false)

const flavors = [
  { name: 'Květinová', icon: FlowerIcon },
  { name: 'Ovocná', icon: AppleIcon },
  { name: 'Zemitá', icon: FlameIcon },
  { name: 'Kořeněná', icon: LeafIcon },
  { name: 'Sladká', icon: CandyIcon },
  { name: 'Oříšková', icon: NutIcon },
  { name: 'Mátová', icon: SnowflakeIcon },
  { name: 'Uzená', icon: CloudIcon }
]

const caffeineOptions = [
  { name: 'Vysoká', icon: BatteryFullIcon },
  { name: 'Střední', icon: BatteryMediumIcon },
  { name: 'Nízká', icon: BatteryLowIcon },
  { name: 'Bez kofeinu', icon: BatteryIcon }
]

const healthGoals = [
  { name: 'Zvýšení energie', icon: ZapIcon },
  { name: 'Zlepšení trávení', icon: HeartPulseIcon },
  { name: 'Zlepšení soustředění', icon: BrainIcon },
  { name: 'Snížení stresu', icon: HeartHandshakeIcon },
  { name: 'Podporu spánku', icon: MoonIcon },
  { name: 'Podporu hubnutí', icon: ScaleIcon }
]

const timesOfDay = [
  { name: 'Ráno', icon: SunriseIcon },
  { name: 'Odpoledne', icon: SunIcon },
  { name: 'Večer', icon: SunsetIcon },
  { name: 'Před spaním', icon: BedIcon },
  { name: 'Kdykoliv', icon: ClockIcon }
]

const temperatureOptions = [
  { name: 'Horký', icon: ThermometerIcon },
  { name: 'Ledový', icon: IceCreamIcon },
  { name: 'Oba', icon: CoffeeIcon }
]

const formData = reactive({
  flavors: [],
  caffeine: '',
  healthGoals: [],
  timesOfDay: [],
  temperature: ''
})

const nextStep = () => {
  if (currentStep.value < steps.length && validateStep()) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const validateStep = () => {
  let isValid = true
  switch (currentStep.value) {
    case 1:
      isValid = formData.flavors.length > 0
      break
    case 2:
      isValid = formData.caffeine !== ''
      break
    case 3:
      isValid = formData.healthGoals.length > 0
      break
    case 4:
      isValid = formData.timesOfDay.length > 0
      break
    case 5:
      isValid = formData.temperature !== ''
      break
    default:
      isValid = true
  }

  if (!isValid) {
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 300)
  }

  return isValid
}

const reset = () => {
  currentStep.value = 1

  Object.assign(formData, {
    flavors: [],
    caffeine: '',
    healthGoals: [],
    timesOfDay: [],
    temperature: ''
  })

  resultsVisible.value = false
}

const getTeaPersonality = () => {
  const { flavors, caffeine, healthGoals, timesOfDay, temperature } = formData;

  if (caffeine === 'Vysoká' && healthGoals.includes('Zvýšení energie')) {
    return 'Kofeínový Maniak'; // Caffeine-loving, energy-focused personality
  }
  if (flavors.includes('Sladká') && timesOfDay.includes('Před spaním') && temperature === 'Horký') {
    return 'Noční Sladouš'; // Sweet-toothed, night-loving tea personality
  }
  if (flavors.includes('Zemitá') && healthGoals.includes('Zlepšení trávení') && temperature === 'Ledový') {
    return 'Ledový Guru'; // Earthy, digestion-oriented, cold tea fan
  }
  if (caffeine === 'Bez kofeinu' && timesOfDay.includes('Ráno') && healthGoals.includes('Podporu spánku')) {
    return 'Klidný Čajovník'; // Calm, caffeine-free morning tea personality
  }

  return 'Nezávislý Čajový Dobrodruh';
}

const submitForm = () => {
  console.log('Form submitted:', formData)
  resultsVisible.value = true
}

const getStepTitle = (key) => {
  const titles = {
    flavors: 'Chuťové preference',
    caffeine: 'Preference kofeinu',
    healthGoals: 'Zdraví a wellness cíle',
    timesOfDay: 'Příležitost nebo denní doba',
    temperature: 'Preference teploty'
  }
  return titles[key] || key
}
</script>

<style scoped>
@keyframes wiggle {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

.wiggle {
  animation: wiggle 0.3s ease-in-out;
}
</style>