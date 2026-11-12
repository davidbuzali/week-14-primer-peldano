import VentureApp from '@/src/components/VentureApp'
import { isSupabaseConfigured } from '@/src/lib/supabase'

export default function EvidenceDemo() {
  return <VentureApp supabaseConfigured={isSupabaseConfigured()} />
}
