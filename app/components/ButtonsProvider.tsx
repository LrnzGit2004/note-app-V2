import { Button } from "@/components/ui/button"

export default function ButtonsProvider() {
  return (
    <div className='flex flex-col gap-4 pt-10'>
        <Button>
            Continuer avec Google
        </Button>
        <Button>
            Continuer avec Github
        </Button>
      
    </div>
  )
}
