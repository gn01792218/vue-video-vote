export enum VideoStatus {
  STOP, //停止影片的撥放
  VOTING, //投票中，此時大螢幕顯示A、B票數、手機端出現A、B按鈕
  VOTED, //此時也是主影片撥放完畢的時候
  BRANCHVIDEOCOMPLETE, //分支影片撥放完畢
}
export enum VideoSide {
  A = "A",
  B = "B",
}
export declare interface Video {
  id: string;
  url: string; //視訊URL
  branch_A_url: string; //視訊分支A URL
  branch_B_url: string; //視訊分支B URL
  vote_A: number; //視訊A的得票數
  vote_B: number; //視訊B的得票數
  Btn_A_C: string;
  Btn_A_E: string;
  Btn_B_C: string;
  Btn_B_E: string;
  Qstring_C: string;
  Qstring_E: string;
}
export declare interface VideoControler {
  current_video_index: number; //主控當前撥放的video_index (從0開始即可)
  video_status: VideoStatus;
}
//API請求與回應
export declare interface VideoVoteRequest {
  video_index: number; //video的index
  vote_side: VideoSide; //投哪一邊(值只會給 'A' or 'B')
}
export declare interface VideoControlRequest {
  current_video_index: number; //主控當前撥放的video_index (從0開始即可)
  video_status: VideoStatus;
}

export declare interface VideoInfor {
  online_amt: number; //在線人數
  Q5_A_amt: number; //投A人數
  Q5_B_amt: number; //投B人數
}
