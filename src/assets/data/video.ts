import { Video, VideoControler, VideoStatus } from "../../types/video";

export const videoControl:VideoControler = {
    current_video_index:0,
    video_status:VideoStatus.STOP
}
export const videos:Video[] = [
    {
        id:'001',
        url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_01.mp4',
        branch_A_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_01_A.mp4',
        branch_B_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_01_B.mp4',
        vote_A:0,
        vote_B:0
    },
    {
        id:'002',
        url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_02.mp4',
        branch_A_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_02_A.mp4',
        branch_B_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_02_B.mp4',
        vote_A:0,
        vote_B:0
    },
    {
        id:'003',
        url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_03.mp4',
        branch_A_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_03_A.mp4',
        branch_B_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_03_B.mp4',
        vote_A:0,
        vote_B:0
    },
    {
        id:'004',
        url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_04.mp4',
        branch_A_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_04_A.mp4',
        branch_B_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_04_B.mp4',
        vote_A:0,
        vote_B:0
    },
    {
        id:'005',
        url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_05.mp4',
        branch_A_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_05_A.mp4',
        branch_B_url:'https://www.ebrainzone.com/JTI/240611_JTI_Acopy_V3_D_05_B.mp4',
        vote_A:0,
        vote_B:0
    },
]