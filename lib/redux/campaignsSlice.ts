import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Campaign {
  id: string
  target: {
    username: string
    avatar: string
    domain?: string
    role?: string
    tg_id?: string
    per_desc?: string
  }
  status: 'contacting' | 'in-conversation' | 'closed' | 'failed'
  lastInteraction: string
}

interface CampaignsState {
  campaigns: Campaign[]
}

const initialState: CampaignsState = {
  campaigns: []
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns(state, action: PayloadAction<Campaign[]>) {
      state.campaigns = action.payload
    }
  }
})

export const { setCampaigns } = campaignsSlice.actions
export default campaignsSlice.reducer
