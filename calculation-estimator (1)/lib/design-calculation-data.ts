// lib/design-calculation-data.ts
import type { DesignCalculationState } from "@/types/design-calculation"

export const initialDesignCalculationState: DesignCalculationState = {
  loadCalculation: {
    V1_tankWeight: "3,000",
    V2_fuelWeight: "50,000",
    V3_slabWeight: "12,961",
    Sigma_V_result: "65,961",
    KMH: "0.600",
    H1_calc_values: "3,000×0.600",
    H1_result: "1,800",
    H2_calc_values: "50,000×0.600",
    H2_result: "30,000",
    H3_calc_values: "12,961×0.600",
    H3_result: "7,777",
    Sigma_H_result: "39,577",
    L1_calc_values: "20/2＋1.0",
    L1_result: "11.0",
    M1_calc_values: "1,800×11.0",
    M1_result: "19,800",
    L2_result: "11.0",
    M2_calc_values: "30,000×11.0",
    M2_result: "330,000",
    L3_calc_values: "1.0/2",
    L3_result: "0.5",
    M3_calc_values: "7,777×0.500",
    M3_result: "3,889",
    Sigma_M_result: "353,689",
    KMV: "0.300",
    Sigma_V_plus_calc_values: "65,961×(1-0.300)",
    Sigma_V_plus_result: "46,173",
    Sigma_V_minus_calc_values: "65,961×(1+0.300)",
    Sigma_V_minus_result: "85,749",
  },
  pileReaction: {
    Pd_Sigma_V_minus: "85,749",
    Pd_Sigma_n: "169",
    Pd_Sigma_M: "353,689",
    Pd_Sigma_x_sq: "7,245.86",
    Pd_xi: "10.5",
    Pd_calc_values: "85,749/169＋353,689/7,245.86×10.5",
    Pd_result: "1019.9",
    Ptd_Sigma_V_plus: "46,173",
    Ptd_Sigma_n: "169",
    Ptd_Sigma_M: "353,689",
    Ptd_Sigma_x_sq: "7,245.86",
    Ptd_xi: "-10.5",
    Ptd_calc_values: "46,173/169＋353,689/7,245.86×-10.5",
    Ptd_result: "-239.3",
    Hd_Sigma_H: "39,577",
    Hd_Sigma_n: "169",
    Hd_calc_values: "39,577/169",
    Hd_result: "234.2",
  },
  sectionalForce: {
    beta_ground_improvement_value: "0.390",
    beta_ground_improvement_calc: "2.564",
    beta_silt_layer_value: "0.603",
    beta_silt_layer_calc: "1.658",
    effective_beta: "0.390", // Simplified from prompt, was 0.404 then 0.390
    Md_Hd: "234.2",
    Md_calc_values: "234.2／（2×0.390）",
    Md_result: "300.3",
    Nd_Pd: "1019.9",
    Nd_result: "1019.9",
    Ntd_Ptd: "-239.3",
    Ntd_result: "-239.3",
    Sd_Hd: "234.2",
    Sd_result: "234.2",
  },
  bendingShearStress: {
    ro_calc: "700／2",
    ro_result: "350",
    fb_Ntd: "-239.3", // kN
    fb_Ae: "198500", // mm^2 (1985 cm^2)
    fb_sigma_e: "10.0", // N/mm^2
    fb_Md: "300.3", // kN.m
    fb_Ie: "9185000000", // mm^4 (9185x10^6 mm^4)
    fb_ro_val: "-350", // mm
    fb_calc_values: "-239.3×10³/198500＋10.0＋300.3×10⁶/(9185×10⁶)×(-350)", // Adjusted for units
    fb_result: "-2.65", // N/mm^2
    fc_Nd: "1019.9", // kN
    fc_Ae: "198500", // mm^2
    fc_sigma_e: "10.0", // N/mm^2
    fc_Md: "300.3", // kN.m
    fc_Ie: "9185000000", // mm^4
    fc_ro_val: "350", // mm
    fc_calc_values: "1019.9×10³/198500＋10.0＋300.3×10⁶/(9185×10⁶)×350", // Adjusted for units
    fc_result: "26.57", // N/mm^2
    tau_max_Sd: "234.2", // kN
    tau_max_So_val: "1.817×10⁷", // mm³
    tau_max_t_val: "100", // mm
    tau_max_I_val: "8.718×10⁹", // mm⁴
    tau_max_calc_values: "234.2×10³×1.817×10⁷／（2・100・8.718×10⁹）",
    tau_max_result: "2.441", // N/mm^2
    So_ro_val: "350",
    So_ri_val: "250",
    So_calc_values: "2/3×（350³－250³）",
    So_result: "1.817×10⁷",
    I_ro_val: "350",
    I_ri_val: "250",
    I_calc_values: "π/4×（350⁴－250⁴）",
    I_result: "8.718×10⁹",
    t_value: "100",
    ri_ro_val: "700",
    ri_t_val: "100",
    ri_calc_values: "(700-2・100)/2",
    ri_result: "250",
  },
  allowableStress: {
    allowable_ft_minus: "-5.0",
    allowable_fc: "48.0",
    tau_a_sigma_g_val: "8.731",
    tau_a_sigma_d_val: "1.8", // From prompt, was 1.8
    tau_a_calc_intermediate: "1/2×√｛(8.731＋２×1.8）²－8.731²｝",
    tau_a_result_intermediate: "4.354",
    sigma_g_sigma_e: "10.0",
    sigma_g_N_val: "-239.3", // kN
    sigma_g_Ac_val: "188500", // mm^2 (Ac for PHC pile)
    sigma_g_calc: "10.0＋（－239.3）×10³/188500",
    sigma_g_result: "8.731",
    sigma_d_concrete: "1.8",
    tau_a_short_term_factor: "1.5",
    tau_a_calc_short_term: "1.5×4.354",
    tau_a_result_short_term: "6.531",
  },
  bearingPullout: {
    Ra_Ru_val: "3947.17", // Updated based on re-calc
    Ra_F_val: "1.5",
    Ra_calc: "3947.17／1.5",
    Ra_result: "2631.45",
    Ru_qp_N_val: "21.857", // N_avg_result
    Ru_qp_Ap_val: "0.3848",
    Ru_qp_calc: "200・21.857・0.3848", // Result: 1682.2
    Ru_sum_Ns_Ls_psi_calc_prefix: "10／3×2.199", // Result: 7.33
    Ru_sum_Ns_Ls_values: "（20×5.0＋15×12.0＋30×0.9）", // Result: 100+180+27 = 307
    Ru_sum_Ns_Ls_psi_result: "2250.11", // 7.33 * 307
    Ru_sum_qu_Lc_psi_val: "0.0",
    Ru_calc_final: "1682.2＋2250.11＋0.0",
    Ru_result: "3932.31", // Updated
    N_avg_upper_4d_calc: "30×0.9＋15×1.9", // (Ns3 * (0.9m)) + (Ns2 * (2.8m - 0.9m))
    N_avg_upper_4d_result: "55.5", // 27 + 28.5
    N_avg_lower_1d_calc: "30×0.7",
    N_avg_lower_1d_result: "21.0",
    N_avg_calc: "（55.5＋21.0）／（2.8＋0.7）",
    N_avg_result: "21.857",
    Ap_calc: "0.7×0.7×π/4",
    Ap_result: "0.3848",
    psi_calc: "0.7×π",
    psi_result: "2.199",
    Pa_Pu_val: "2250.11", // Ru_sum_Ns_Ls_psi_result
    Pa_F_val: "1.5",
    Pa_W_val: "82.6", // W_result
    Pa_calc: "2250.11／1.5＋82.6",
    Pa_result: "1582.71", // Updated
    Pu_sum_Ns_Ls_psi_result: "2250.11",
    W_gamma_val: "24.5",
    W_A_val: "188500", // mm^2
    W_L_val: "17.9", // m
    W_calc: "24.5×188500×10⁻⁶×17.9",
    W_result: "82.6",
  },
}
