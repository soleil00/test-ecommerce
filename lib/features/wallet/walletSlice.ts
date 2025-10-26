import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClientV0 } from '../../axios';

export interface Wallet {
  wallet_address: string;
  wallet_id: string;
  created_at: string;
}

export interface WalletState {
  wallets: Wallet[];
  currentWallet: Wallet | null;
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallets: [],
  currentWallet: null,
  loading: false,
  error: null,
};

// Async thunk for creating a wallet
export const createWallet = createAsyncThunk(
  'wallet/createWallet',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClientV0.post('/');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create wallet'
      );
    }
  }
);

// Async thunk for fetching wallets (if you have an endpoint for this)
export const fetchWallets = createAsyncThunk(
  'wallet/fetchWallets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClientV0.get('/');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch wallets'
      );
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentWallet: (state, action: PayloadAction<Wallet | null>) => {
      state.currentWallet = action.payload;
    },
    clearWallets: (state) => {
      state.wallets = [];
      state.currentWallet = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create wallet
      .addCase(createWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets.push(action.payload);
        state.currentWallet = action.payload;
        state.error = null;
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch wallets
      .addCase(fetchWallets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = action.payload;
        state.error = null;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentWallet, clearWallets } = walletSlice.actions;
export default walletSlice.reducer;
