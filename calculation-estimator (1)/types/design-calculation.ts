// types/design-calculation.ts

export interface LoadCalculationData {
  V1_tankWeight: string
  V2_fuelWeight: string
  V3_slabWeight: string
  Sigma_V_result: string
  KMH: string
  H1_calc_values: string // e.g., "3,000×0.600"
  H1_result: string
  H2_calc_values: string
  H2_result: string
  H3_calc_values: string
  H3_result: string
  Sigma_H_result: string
  L1_calc_values: string // e.g., "20/2＋1.0"
  L1_result: string
  M1_calc_values: string
  M1_result: string
  L2_result: string
  M2_calc_values: string
  M2_result: string
  L3_calc_values: string
  L3_result: string
  M3_calc_values: string
  M3_result: string
  Sigma_M_result: string
  KMV: string
  Sigma_V_plus_calc_values: string // e.g., "65,961×(1-0.300)"
  Sigma_V_plus_result: string
  Sigma_V_minus_calc_values: string
  Sigma_V_minus_result: string
}

export interface PileReactionData {
  Pd_Sigma_V_minus: string
  Pd_Sigma_n: string
  Pd_Sigma_M: string
  Pd_Sigma_x_sq: string
  Pd_xi: string
  Pd_calc_values: string // e.g., "85,749/169＋353,689/7,245.86×10.5"
  Pd_result: string
  Ptd_Sigma_V_plus: string
  Ptd_Sigma_n: string
  Ptd_Sigma_M: string
  Ptd_Sigma_x_sq: string
  Ptd_xi: string
  Ptd_calc_values: string
  Ptd_result: string
  Hd_Sigma_H: string
  Hd_Sigma_n: string
  Hd_calc_values: string
  Hd_result: string
}

export interface SectionalForceData {
  beta_ground_improvement_value: string
  beta_ground_improvement_calc: string
  beta_silt_layer_value: string
  beta_silt_layer_calc: string
  effective_beta: string
  Md_Hd: string
  Md_calc_values: string // e.g., "234.2／（2×0.390）"
  Md_result: string
  Nd_Pd: string
  Nd_result: string
  Ntd_Ptd: string
  Ntd_result: string
  Sd_Hd: string
  Sd_result: string
}

export interface BendingShearStressData {
  ro_calc: string
  ro_result: string
  fb_Ntd: string
  fb_Ae: string
  fb_sigma_e: string
  fb_Md: string
  fb_Ie: string
  fb_ro_val: string // for -350
  fb_calc_values: string
  fb_result: string
  fc_Nd: string
  fc_Ae: string
  fc_sigma_e: string
  fc_Md: string
  fc_Ie: string
  fc_ro_val: string // for 350
  fc_calc_values: string
  fc_result: string
  tau_max_Sd: string
  tau_max_So_val: string
  tau_max_t_val: string
  tau_max_I_val: string
  tau_max_calc_values: string
  tau_max_result: string
  So_ro_val: string
  So_ri_val: string
  So_calc_values: string
  So_result: string
  I_ro_val: string
  I_ri_val: string
  I_calc_values: string
  I_result: string
  t_value: string
  ri_ro_val: string
  ri_t_val: string
  ri_calc_values: string
  ri_result: string
}

export interface AllowableStressData {
  allowable_ft_minus: string
  allowable_fc: string
  tau_a_sigma_g_val: string
  tau_a_sigma_d_val: string
  tau_a_calc_intermediate: string
  tau_a_result_intermediate: string
  sigma_g_sigma_e: string
  sigma_g_N_val: string
  sigma_g_Ac_val: string
  sigma_g_calc: string
  sigma_g_result: string
  sigma_d_concrete: string
  tau_a_short_term_factor: string
  tau_a_calc_short_term: string
  tau_a_result_short_term: string
}

export interface BearingPulloutData {
  Ra_Ru_val: string
  Ra_F_val: string
  Ra_calc: string
  Ra_result: string
  Ru_qp_N_val: string // N from N_avg_result
  Ru_qp_Ap_val: string
  Ru_qp_calc: string // 200 * N * Ap
  Ru_sum_Ns_Ls_psi_calc_prefix: string // 10/3 * psi
  Ru_sum_Ns_Ls_values: string // (20*5.0 + 15*12.0 + 30*0.9)
  Ru_sum_Ns_Ls_psi_result: string
  Ru_sum_qu_Lc_psi_val: string // usually 0.0
  Ru_calc_final: string // qp_calc + NsLs_psi_result + quLc_psi_val
  Ru_result: string
  N_avg_upper_4d_calc: string
  N_avg_upper_4d_result: string
  N_avg_lower_1d_calc: string
  N_avg_lower_1d_result: string
  N_avg_calc: string
  N_avg_result: string
  Ap_calc: string
  Ap_result: string
  psi_calc: string
  psi_result: string
  Pa_Pu_val: string
  Pa_F_val: string
  Pa_W_val: string
  Pa_calc: string
  Pa_result: string
  Pu_sum_Ns_Ls_psi_result: string // same as Ru_sum_Ns_Ls_psi_result
  W_gamma_val: string
  W_A_val: string
  W_L_val: string
  W_calc: string
  W_result: string
}

export interface DesignCalculationState {
  loadCalculation: LoadCalculationData
  pileReaction: PileReactionData
  sectionalForce: SectionalForceData
  bendingShearStress: BendingShearStressData
  allowableStress: AllowableStressData
  bearingPullout: BearingPulloutData
}
